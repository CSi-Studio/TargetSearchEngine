import {Colors} from "@/components/Enums/Colors";

export const renderXicInOneItem = (params: any, api: any) => {
  if (params.context.rendered) {
    return;
  }
  params.context.rendered = true;

  const points = [];
  for (let i = 0; i < params.dataInsideLength; i++) {
    points.push(api.coord([api.value(0, i), api.value(1, i)]));
  }

  return {
    type: 'polygon',
    shape: {
      points,
    },
    zIndex: 1,
    style: {
      fill: Colors.XicInOneArea,
    },
  };
};

export const renderXicMatrixItem = (params: any, api: any) => {
  if (params.context.rendered) {
    return;
  }
  params.context.rendered = true;

  const points = [];
  for (let i = 0; i < params.dataInsideLength; i++) {
    points.push(api.coord([api.value(0, i), api.value(1, i)]));
  }

  return {
    type: 'polygon',
    shape: {
      points,
    },
    zIndex: 1,
    style: {
      fill: Colors.XicMatrixArea,
    },
  };
};
