import React from "react";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

function MakeCompany() {
  const db = getDatabase();

  const companyRef = ref(db, `company/${uuidv4()}`);

  const setData = () => {
    set(companyRef, {
      companyName: companyName,
    });
  };

  const [companyName, setCompanyName] = React.useState("");
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setCompanyName(e.target.value);
        }}
      />
      <button onClick={setData}>회사 등록</button>
    </div>
  );
}

export default MakeCompany;
