import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
  Outlet,
} from "react-router-dom";
import Layout from "./components/Layout";
import NewNote from "./components/NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { NoteData, RawNote, Tag } from "./types/type";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTS", []);
  const [tags, setTages] = useLocalStorage<Tag[]>("TAGS", []);

  const noteWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tages: tags.filter((tag) => tag.id.includes(tag.id)) };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNote) => {
      return [
        ...prevNote,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTages((prev) => [...prev, tag]);
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="/new" element={<Outlet />}>
            <Route
              index
              element={
                <NewNote
                  onSubmit={onCreateNote}
                  onAddTag={addTag}
                  availableTags={tags}
                />
              }
            />
            <Route path=":showId" element={<h1>Show</h1>} />
            <Route path=":editId" element={<h1>Edit</h1>} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
