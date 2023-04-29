const useOnCount = (data, type) => {
  console.log(data);
  const reducedData = data?.reduce((acc, cur) => {
    const found =
      acc?.length &&
      acc.find((d) => {
        const equal =
          d[type].toString().toLowerCase() ===
          cur[type].toString().toLowerCase();
        if (equal) {
          d.count += 1;
        }
        return equal;
      });
    if (!found) {
      acc.push({
        [type]: cur[type],
        count: 1,
      });
    }
    return acc;
  }, []);
  const finalData = reducedData
    ?.map((d) => {
      if (d.count > 5 && data.length === 1000) {
        return {
          [type]: d[type],
          count: d.count,
        };
      } else if (data.length < 1000) {
        return {
          [type]: d[type],
          count: d.count,
        };
      } else return null;
    })
    .filter((d) => d !== null && d[type]);
  console.log(finalData);
  return finalData;
};

export default useOnCount;
