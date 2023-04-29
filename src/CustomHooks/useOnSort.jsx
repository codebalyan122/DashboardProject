const useOnSort = (data, type, unit) => {
  const reducedData = data?.reduce((acc, cur) => {
    const found =
      acc?.length &&
      acc.find((d) => {
        const equal =
          d[type].toString().toLowerCase() ===
          cur[type].toString().toLowerCase();
        if (equal) {
          d.count += 1;
          d[unit] += Number(cur[unit]);
        }
        return equal;
      });
    if (!found) {
      acc.push({
        [type]: cur[type],
        [unit]: Number(cur[unit]),
        count: 1,
      });
    }
    return acc;
  }, []);
  const finalData = reducedData?.map((d) => {
    return {
      [type]: d[type],
      [unit]: (d[unit] /= d.count),
    };
  });
  return finalData;
};

export default useOnSort;
