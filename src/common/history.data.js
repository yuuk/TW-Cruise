function genData(num=10) {
  const result = [];
  for(let i = 0;i<num; i++) { // eslint-disable-line
    const id = i+1;
    result.push({
      id,
      label: `bjstdmngbgr0${id}.thoughtworks.com`,
    })
  }
  return result;
}

export default genData();
