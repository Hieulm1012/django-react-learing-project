import { useState, useEffect } from "react";
import api from "../api";
import Note from "../compoment/Note";
import { notification } from "antd";
import "../styles/Home.css";
import "../styles/Sidebar.css";
import { Layout } from "antd";
import Logo from "../compoment/Logo";
import MenuList from "../compoment/MenuList";
import { useNavigate } from "react-router-dom";

const { Header, Sider } = Layout

function Home() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => { setNotes(data); })
            .catch((e) => {
                if (e.message === "Request failed with status code 401") {
                    alert("please Login")
                    navigate("/login");
                    return
                }
                alert(e)

            });
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) notification.success({
                    message: 'Success',
                    description: 'Note delete successfully!',
                    placement: 'topRight',
                    duration: 1,
                });
                else alert("Failed to delete note.");
                getNotes()
            }).catch((e) => alert(e))

    };

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) notification.success({
                    message: 'Success',
                    description: 'Note created successfully!',
                    placement: 'topRight',
                    duration: 1,
                });
                else alert("false");
                getNotes()
            }).catch((err) => alert(err))
    }

    return <Layout>
        <Sider className="sidebar">
            <Logo />
            <MenuList />
        </Sider>

        <div className="main">
            <div>
                <div className="create-note-section">
                    <h2>Create a Note</h2>
                    <form onSubmit={createNote}>
                        <label htmlFor="title">Title</label>
                        <br />
                        <input type="text"
                            id="title"
                            name="title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                        <label htmlFor="content"></label>
                        <br />
                        <textarea type="text"
                            id="content"
                            name="content"
                            required
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                        <br />
                        <input
                            type="submit"
                            value="Submit"
                        />
                    </form>
                </div>
                <div className="notes-section"></div>
                <h2>Notes</h2>
                <Note notes={notes} onDelete={deleteNote} />
            </div>
        </div>
    </Layout>
}

export default Home