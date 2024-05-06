import "./Chatbot.scss";
import React, { useState } from "react";
import axios from "./../../setup/axios";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import ClipLoader from "react-spinners/ClipLoader";
const Chatbot = (props) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const getResponseAi = async () => {
    const userMessage = currentMessage;
    setCurrentMessage("")
    setIsLoading(true);
    const response = await axios.post("/code-explain/", { _input: userMessage });
    const newMessage = response.data;
    setMessages([...messages, newMessage]);
    setIsLoading(false);
    console.log(response.data);
  }
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };
  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <div  >
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
        <div >
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
              <div className="card-body position-relative" style={{ height: "400px", overflowY: "auto" }}>
                {messages && messages.length > 0 &&
                  messages.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="d-flex flex-row justify-content-end mb-4">
                          <div
                            className="p-3 me-3 border"
                            style={{
                              borderRadius: "15px",
                              backgroundColor: "#fbfbfb",
                            }}
                          >
                            <h6 className="small mb-0">{item._input}</h6>
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
                            <h6 className="small mb-0">{item._output}</h6>
                          </div>
                        </div>
                      </div>
                    )
                  })

                }
                {
                  isLoading &&
                  <div className='d-flex justify-content-center align-items-center flex-column '>
                    <ClipLoader
                      color={"black"}
                      loading={isLoading}
                      // cssOverride={}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                    <span>Loading...</span>
                  </div>
                }

                <div className="form-outline position-relative d-flex border border-2 rounded-2" style={{top: "325px"}}>
                  <textarea
                    className="form-control border-0"
                    id="textAreaExample"
                    rows="1"
                    placeholder="Type your message"
                    value={currentMessage}
                    onChange={(e) => { setCurrentMessage(e.target.value) }}

                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault(); // Ngăn chặn việc xuống dòng khi nhấn Enter
                        getResponseAi(); // Gọi hàm getResponseAi
                      }
                    }}
                  ></textarea>
                  <Button variant="danger" className="rounded-start-0 border-0" onClick={() => { getResponseAi(currentMessage) }}><FontAwesomeIcon icon={faPaperPlane} /></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
