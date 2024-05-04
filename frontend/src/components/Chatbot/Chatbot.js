import "./Chatbot.scss";
import React, { useState } from "react";

const Chatbot = (props) => {
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <>
      <button
        className="chatbot-btn btn  btn-xl rounded-circle"
        onClick={toggleChatbot}
        style={{
          width: "5rem",
          height: "5rem",
        }}
      >
        <img
          className="img-fluid"
          src="https://static-00.iconduck.com/assets.00/chat-icon-2048x2048-i7er18st.png"
        />
      </button>
      {showChatbot && (
        <div>
          <div className="chatbot-info2 col-md-8 col-lg-6 col-xl-4">
            <div className="card" id="chat1" style={{ borderRadius: "15px" }}>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-danger text-white border-bottom-0"
                style={{
                  borderTopLeftRadius: "15px",
                  borderTopRightRadius: "15px",
                }}
              >
                <img
                  src="https://cdn-icons-png.freepik.com/512/8943/8943377.png"
                  style={{ width: "45px", height: "100%" }}
                ></img>
                <div className="mb-0 fw-bold">Chatbot</div>
                <i
                  className="fas fa-times"
                  style={{ width: "45px", height: "100%" }}
                  onClick={closeChatbot}
                ></i>
              </div>
              <div className="card-body">
                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div
                    className="p-3 ms-3"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(57, 192, 237,.2)",
                    }}
                  >
                    <p className="small mb-0">Welcome to FAHAHA.</p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4">
                  <div
                    className="p-3 me-3 border"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#fbfbfb",
                    }}
                  >
                    <p className="small mb-0">Hmm....</p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                  <div
                    className="p-3 ms-3"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "rgba(57, 192, 237,.2)",
                    }}
                  >
                    <p className="small mb-0">...</p>
                  </div>
                </div>

                <div className="form-outline d-flex">
                  <textarea
                    className="form-control"
                    id="textAreaExample"
                    rows="3"
                    placeholder="Type your message"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
