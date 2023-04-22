const useOnSort = (data) => {
  const reducedData = data?.reduce((acc, cur) => {
    const found =
      acc?.length &&
      acc.find((d) => {
        if (d.sector === cur.sector) {
          d.count += 1;
          d.intensity += Number(cur.intensity);
        }
        return d.sector === cur.sector;
      });
    if (!found) {
      acc.push({
        sector: cur.sector,
        intensity: Number(cur.intensity),
        count: 1,
      });
    }
    return acc;
  }, []);
  const finalData = reducedData?.map((d) => {
    return {
      sector: d.sector,
      intensity: (d.intensity /= d.count),
    };
  });
  return finalData;
};

export default useOnSort;
