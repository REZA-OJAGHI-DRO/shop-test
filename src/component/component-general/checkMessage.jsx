import React from 'react'
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function CheckMessage({message , check}) {
  return (
    <div className="w-[90%] xl:w-[50%] z-[1000] fixed top-[5vh] left-[5%] xl:left-[25%] text-[1.2rem]">
    <Stack sx={{ width: "100%" }} spacing={2}>
      {check.check1 == true && (
        <Alert severity="success" className="border-2 border-black flex justify-center">
          {message}
        </Alert>
      )}
      {check.check2 == true && (
        <Alert severity="info" className="border-2 border-black flex justify-center">
           {message}
        </Alert>
      )}
      {check.check3 == true && (
        <Alert severity="warning" className="border-2 border-black flex justify-center">
           {message}
        </Alert>
      )}
      {check.check4 == true && (
        <Alert severity="error" className="border-2 border-black flex justify-center">
          {message}
        </Alert>
      )}
    </Stack>
  </div>
  )
}

export default CheckMessage