export const isFileSizeValid = (fileSize: number) => {
  if(fileSize/10000 > 7) {
    return false
  }
  return true;
}