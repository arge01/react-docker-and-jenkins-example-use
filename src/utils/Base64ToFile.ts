function Base64ToFile(dataURL: any) {
  return dataURL ? dataURL.replace("data:", "").replace(/^.+,/, "") : null;
}

export default Base64ToFile;
