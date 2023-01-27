import { useState } from "react"
import { BigButton } from "../../components/bigButton/bigButton";
import { LongInput } from "../../components/longInput/longInput"
import { MentorService } from "../../service/mentor/mentorService";


export const AddIteam = () => {

const [type,setTextType] = useState("");
const [code,setTextCode] = useState("");
const [solution,setTextSolution] = useState("");
const mentorService = new MentorService

  const addCodeBlock = async() => {
    const newCodeBlock ={
        type,
        code,
        solution
    }
    const result = await mentorService.addCodeBlock(newCodeBlock);
    alert("the codeBlock is already");
  }
    return(
        <>
        <div>
          <h1>add a new code block</h1>
        </div>
        <from>
        <div className="line">
            <a>Titel :</a>
           <LongInput onChange={(e) => setTextType(e.target.value)} required></LongInput> 
        </div>
        <div className="line">
            <a>Code :</a>
            <LongInput onChange={(e) => setTextCode(e.target.value)} required></LongInput> 
        </div>
        <div className="line">
            <a>Answer :</a>
            <LongInput onChange={(e) => setTextSolution(e.target.value)} required></LongInput> 
        </div>
        <div className="line">
            <BigButton type="submit" onClick={() => addCodeBlock()}>add</BigButton>
        </div>
        </from>
         
        </>
    )
    }