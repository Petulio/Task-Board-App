import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useForm } from "react-hook-form";

export function CreateTask({}) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    var postData = JSON.stringify(data);
    axios
      .post("http://localhost:8000/tasks/", postData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });
  };

  return (
    <div>
      <div className="create-card">
        <div className="create-task-title">Create Task: </div>
        <div className="test">
          <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label> Username: </label>
              <input name="user" ref={register({ required: true })} />

              <label> Task: </label>
              <input name="text" ref={register({ required: true })} />

              <label> Task done: </label>
              <input
                name="done"
                type="checkbox"
                ref={register}
                value={Boolean}
              ></input>
            </div>
            <input type="submit" />
          </form>
          {errors.username && " Username is required! "}
          {errors.task && " Task text is required! "}
        </div>
        <style jsx>{`
          .create-task-title {
            color: deepskyblue;
            font-size: 25px;
          }
          .test {
            margin: 1%;
            text-align: center;
            font-size: 20px;
            border: 1.2px solid grey;
            border-radius: 25px;
          }
          .form-body {
            margin: 2% 4% 2% 4%;
          }
        `}</style>
      </div>
    </div>
  );
}

export default function Home({ tasks }) {
  function deleteTask(id) {
    console.log(id);
    axios
      .delete(`http://localhost:8000/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        console.log(resp);
      });
  }

  return (
    <div className="app-container">
      <Head>
        <title>Create Tasks App</title>
      </Head>

      <main>
        <h1>
          Welcome to the <div className="title-color">Tasks App</div>
        </h1>
        <div className="task-board-body">
          <div className="task-board-title">Current tasks:</div>
          <div className="task-cards">
            {tasks.map((task) => (
              <div className="card" key={task.unique_id}>
                <div className="card-content">
                  <div id="container">
                    <div className="column left up">{task.user}:</div>
                    <div className="column right up">
                      <img
                        src="/images/blue_pen.png"
                        alt="pencil"
                        className="icon"
                      />
                    </div>
                    <div className="column right up">
                      <img
                        src="/images/blue_trash_can.jpg"
                        alt="trash can"
                        className="icon"
                        onClick={() => deleteTask(task.unique_id)}
                      />
                    </div>
                  </div>
                  <div id="container">
                    <div className="column left down">{task.text}</div>
                    <div className="column right down">{String(task.done)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <CreateTask className="task" />
        </div>
      </main>

      <footer>
        <a>Powered by Stefan </a>
      </footer>

      <style jsx>{`
        .title-color {
          color: deepskyblue;
        }
        .app-container {
          margin: 0%;
          font-family: "Roboto";
        }
        .task-board-body {
          margin: 0% 14% 5% 14%;
        }
        .task-board-title {
          font-size: 25px;
          color: deepskyblue;
        }
        .task-cards {
          margin: 3% 5% 5% 5%;
        }
        .card {
          margin: 1% 0% 1% 0%;
          font-size: 25px;
          border: 1.2px solid grey;
          border-radius: 25px;
        }
        .card:hover {
          border-color: lightskyblue;
          transform: scale(1.02);
        }
        .card-content {
          margin: 1% 5% 1% 5%;
        }
        #container {
          display: flex;
        }
        .column.left.up {
          flex: 1 0 300px;
          font-size: 22px;
          font-weight: bold;
        }
        .column.right.up {
          flex: 0 0 50px;
          font-family: "Roboto-light";
        }
        .column.left.down {
          flex: 1 0 300px;
          font-size: 20px;
          font-family: "Roboto-light";
        }
        .column.right.down {
          flex: 0 0 50px;
        }
        .icon {
          width: 25px;
          height: 25px;
        }
        .icon:hover {
          transform: scale(1.1);
        }
      `}</style>

      <style jsx global>{`
        @font-face {
          font-family: "Roboto";
          src: url("/fonts/Roboto-Regular.ttf");
        }
        @font-face {
          font-family: "Roboto-light";
          src: url("/fonts/Roboto-Light.ttf");
        }
        body {
          margin: 5%;
        }
        h1 {
          text-align: center;
        }
        footer {
          margin-block-start: 3em;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const resp = axios.get(`http://localhost:8000/tasks/`);
  const tasks = (await resp).data;
  return {
    props: {
      tasks,
    },
  };
}
