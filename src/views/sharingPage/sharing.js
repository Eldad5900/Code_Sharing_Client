import "./sharing.css";
import "highlight.js/styles/github.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyCodeEditor } from "../../components/codeEditor/codeEditor";


export const SharingPage = () => {

  const { id } = useParams();

  return (
    <div className="pageSharing">
     <MyCodeEditor codeBlock={id} ></MyCodeEditor>
    </div>
  );
};
