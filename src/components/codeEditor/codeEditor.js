import io from "socket.io-client";
import { useEffect, useState } from "react";
import { MentorService } from "../../service/mentor/mentorService";
import AceEditor from "react-ace";
import brace from "brace";
import "brace/mode/javascript";
import "brace/theme/monokai";
import { AiOutlineSmile } from "react-icons/ai";

export const MyCodeEditor = ({ codeBlock }) => {
  const [socket, setSocket] = useState(null);
  const [DataCodeBlock, setDataCodeBlock] = useState({});
  const [mentor, setMentor] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answer, setAnswer] = useState("");
  const mentorService = new MentorService();

  useEffect(() => {
    const socket = io.connect("https://codesharing.herokuapp.com/", {
      transports: ["websocket"],
    });
    setSocket(socket);
    socket.on("mentor", (data) => {
      setMentor(data.isMentor);
    });
    socket.on("new-remote-operatios", (data) => {
      const updatedCode = { ...DataCodeBlock, code: data };
      setDataCodeBlock((pre) => {
        pre.code = updatedCode.code;
        return { ...pre };
      });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getTheCodeById();
  }, []);

  useEffect(() => {
    if (DataCodeBlock?.code === DataCodeBlock?.solution) {
      console.log("Correct");
      setIsCorrect(true);
    } else {
      console.log("is not Correct");
      setIsCorrect(false);
    }
  }, [DataCodeBlock]);

  const getTheCodeById = async () => {
    const codeItem = await mentorService.getCodeById(codeBlock);
    setDataCodeBlock(codeItem);
  };

  const codeChange = async (newValue) => {
    const updatedCode = await mentorService.editBlockCode(newValue, codeBlock);
    socket.emit("new-operatios", newValue);
  };

  return (
    <div>
      <h1>Topic - javascript : {DataCodeBlock?.type}</h1>

      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={codeChange}
          fontSize={20}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={`${DataCodeBlock?.code}`}
          readOnly={mentor}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{
            width: 2000,
            height: 100,
          }}
        />
      </div>
      <div>
        {mentor ? (
          <div>
            <h1>solution:</h1>
            <h2>{DataCodeBlock?.solution}</h2>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="isCurrct">
        {isCorrect ? (
          <div>
            <h1>You're right !!!</h1>
            <AiOutlineSmile size={500} />
          </div>
        ) : (
          <>
            <h1>complete the sentence !!!</h1>
          </>
        )}
      </div>
    </div>
  );
};
