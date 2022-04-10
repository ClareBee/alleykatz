export const isFileSizeValid = (fileSize: number) => {
  if(fileSize/1000000 > 7) {
    return false
  }
  return true;
}