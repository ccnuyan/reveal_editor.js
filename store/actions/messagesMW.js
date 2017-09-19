/* eslint-disable no-param-reassign */

const messageDict = {
  INSTANT_SAVE_ERROR: () => {
    return {
      status: 'error',
      inline: '保存失败',
      details: '这可能是因为网络问题造成的',
    };
  },
  INSTANT_SAVE_END: (payload) => {
    if (payload.success) {
      return {
        status: 'success',
        header: '保存成功',
      };
    }
    return {
      status: 'error',
      inline: '保存失败',
    };
  },
};

// this is a function to generate the action parameter
export default ({ type, payload }) => {
  const handler = messageDict[type];
  if (handler) {
    return {
      type,
      payload: {
        ...payload,
        ui_message: handler(payload),
      },
    };
  }
  console.log(`no handler found for type: ${type}`); // eslint-disable-line no-console
  return { type, payload };
};

