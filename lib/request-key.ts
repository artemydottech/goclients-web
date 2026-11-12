export const createRequestKey = () => {
  let previous = '';
  let key = '';
  return {
    forPayload(payload: unknown) {
      const fingerprint = JSON.stringify(payload);
      if (fingerprint !== previous || !key) {
        previous = fingerprint;
        key = crypto.randomUUID();
      }
      return key;
    },
    reset() {
      previous = '';
      key = '';
    },
  };
};
