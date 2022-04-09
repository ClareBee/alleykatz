export const isFileSizeValid = (fileSize: number) => {
  if(fileSize/100000 > 7) {
    return false
  }
  return true;
}