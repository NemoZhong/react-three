export const isMobile = () => {
  const mobile = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );
  return mobile != null;
};

export const lerp = (x: number, { minX, maxX, minY, maxY }: any) => {
  var slope = (maxY - minY) / (maxX - minX);
  return (x - minX) * slope + minY;
};
