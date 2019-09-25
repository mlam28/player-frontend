import React from 'react'

function formatDuration(milliseconds){
   const seconds = milliseconds/1000
   const minutes = Math.floor(seconds/60)
   let leftSec = (seconds%60).toFixed(0)
   if (leftSec.length <= 1){
       leftSec = "0" + leftSec
   }
  
   return (`${minutes}:${leftSec}`)
   

}

export {formatDuration}