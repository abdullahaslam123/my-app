import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as eccrypto from 'eccrypto';
require('dotenv').config()

function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.password.value); 
 var privateKey = 'fad79dd5a542537d6615ed2198476fbea99748566b251acdbf693214d6ff11df'
 let PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
 const publicKeyBuffer = Buffer.from(PUBLIC_KEY,"hex");
eccrypto
  .encrypt(publicKeyBuffer, Buffer.from(event.target.password.value))
  .then(function (encrypted) {
  let objstr=JSON.stringify(encrypted)
  let base64Date=Buffer.from(objstr).toString('hex'); // converted to hex
  console.log("Encrypted Message to HEX",Buffer.from(base64Date).toString())
console.log("Encrypted Message",encrypted );
    
// eccrypto.decrypt(privatekeyBuffer, jsonObj)
// .then(function (plaintext) {
//   console.log("Message to part B:", plaintext.toString());

// });
})

}
export default function App() {
  return (
    <Box
      component="form" onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>ECIES POC</h1>
      <div>
        <TextField id="outlined-password-input" label="Password" type="text" name="password" />
      </div>
      <div>
      <Button variant="contained" type="submit">Signup</Button>
      </div>
    </Box>
  );
}
