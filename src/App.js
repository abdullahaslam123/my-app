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
// const convertedPrivateKey = privateKey.toString("hex");
let PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
 const publicKeyBuffer = Buffer.from(PUBLIC_KEY,"hex");
 const privatekeyBuffer = Buffer.from(privateKey,"hex");
eccrypto
  .encrypt(publicKeyBuffer, Buffer.from(event.target.password.value))
  .then(function (encrypted) {
    let encryptedMessageHex=encrypted.toString("hex")
    console.log("Encrypted Message",encryptedMessageHex );
    
eccrypto.decrypt(privatekeyBuffer, Buffer.from(encryptedMessageHex,"hex"))
.then(function (plaintext) {
  console.log("Message to part B:", plaintext.toString());

});
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
      <div>
        <TextField id="outlined-password-input" label="Password" type="text" name="password" />
      </div>
      <div>
      <Button variant="contained" type="submit">Signup</Button>
      </div>
    </Box>
  );
}
