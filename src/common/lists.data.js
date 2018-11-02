function genData(num=5) {
  const result = [];
  for(let i = 0;i<num; i++) { // eslint-disable-line
    const id = i+1;
    const isBuilding = id%2===0 ? 'building': 'idle';
    result.push({
      id,
      status: isBuilding,
      address: `bjstdmngbgr0${id}.thoughtworks.com`,
      ip: `192.168.1.${id}`,
      path: '/var/lib/cruise-agent',
      resources: [{
        id: `ubuntu`,
        label: `ubuntu`,
      }, {
        id:`firefox`,
        label:`firefox`,
      }, {
        id: `core-duo`,
        label: `core-duo`,
      }],
    })
  }
  return result;
}

export default genData(6);
