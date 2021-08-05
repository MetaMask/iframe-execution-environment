// source sortParamKeys from: https://github.com/etclabscore/sig.tools/blob/master/src/postMessageServer/postMessageServer.ts#L75-L77

export const sortParamKeys = (method: any, params: any) => {
  if (!params) {
    return [];
  }
  const docParams = method.params as any;
  const methodParamsOrder: { [k: string]: number } = docParams
    .map((p: any) => p.name)
    .reduce((m: any, pn: any, i: any) => ({ ...m, [pn]: i }), {});

  return Object.entries(params)
    .sort((v1, v2) => methodParamsOrder[v1[0]] - methodParamsOrder[v2[0]])
    .map(([_, val]: any) => val);
};
