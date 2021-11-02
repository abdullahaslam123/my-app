import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as eccrypto from 'eccrypto';


function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.password.value); 
 // You should see email and password in console.
 // ..code to submit form to backend here...
 var privateKey = eccrypto.generatePrivate();
const convertedPrivateKey = privateKey.toString("hex");
// fs.writeFileSync(path.resolve("./test"), convertedPrivateKey);
console.log("ASD: ", convertedPrivateKey)
const privateKeyString_HEX = Buffer.from(convertedPrivateKey,"hex"
);
var publicKey = eccrypto.getPublic(privateKeyString_HEX);
eccrypto
  .encrypt(publicKey, Buffer.from(event.target.password.value))
  .then(function (encrypted) {
    console.log("Encrypted Message", encrypted);
    eccrypto
.decrypt(privateKeyString_HEX, encrypted)
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
