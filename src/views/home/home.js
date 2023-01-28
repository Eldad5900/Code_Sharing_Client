import { useEffect, useState } from "react";
import "./home.css";
import io, { Socket } from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { BigButton } from "../../components/bigButton/bigButton";
import { LongInput } from "../../components/longInput/longInput";
import { MentorService } from "../../service/mentor/mentorService";

export const Home = () => {

  const navigate = useNavigate();
  const [codesBlock, setCodesBlock] = useState([]);
  const [textCodeBlock, setTextCodeBlock] = useState("");
  const mentorService =new MentorService();
 
  useEffect(() => { 
    addAllCodeBlock();
  }, []);

  const addAllCodeBlock = async () => {
     const allCodesBlock = await mentorService.getAllCodesBlock();
     setCodesBlock(allCodesBlock);
  };

  const goToCodeBlock = (codeBlock) => {
    navigate(`/SharingPage/${codeBlock._id}`);
  };

  return (
    <>
      <h1>Choose code block</h1>

      <div>
        <LongInput onChange={(e) => setTextCodeBlock(e.target.value)}></LongInput>
      </div>

      {codesBlock?.filter((code) => code.type.includes(textCodeBlock)).map((code ,index) => ( 
          
          <div className="btnCodeBlock">
            <BigButton key={index} onClick={() => goToCodeBlock(code)}>{code.type}</BigButton>
          </div>
        ))}
        <div>
        <button  onClick={() => navigate("/AddCodeBlock")}>Add CodeBlock</button>
        </div>
    </>
  );
};
