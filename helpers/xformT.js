function transformationPoint(accessPath1, accessPath2) {
  let smallLength = accessPath1.length > accessPath2.length ?
  accessPath2.length :
  accessPath1.length;

  for (let i = 0; i < smallLength; i = i + 1) {
    if (accessPath1[i]['' + i] !== accessPath2[i]['' + i]) {
      return i;
    }
  }

  return smallLength - 1;
}

function effectIndependent(accessPath1, accessPath2) {
  let tpt = transformationPoint(accessPath1, accessPath2);

  if ((accessPath1.length > tpt + 1) && (accessPath2.length > tpt + 1)) {
    return true;
  }

  if ((accessPath1[tpt]['' + tpt] > accessPath2[tpt]['' + tpt]) &&
    (accessPath1.length < accessPath2.length)) {
    return true;
  }
  if ((accessPath1[tpt]['' + tpt] < accessPath2[tpt]['' + tpt]) &&
    (accessPath1.length > accessPath2.length)) {
    return true;
  }

  return false;
}

function xformTii(op1, op2) {
  let tpt = transformationPoint(op1.accessPath, op2.accessPath);

  if (effectIndependent(op1.accessPath, op2.accessPath)) {
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] > op2.accessPath[tpt]['' + tpt]) {
    op1.accessPath[tpt]['' + tpt] = op1.accessPath[tpt]['' + tpt] + 1;
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] < op2.accessPath[tpt]['' + tpt]) {
    op2.accessPath[tpt]['' + tpt] = op2.accessPath[tpt]['' + tpt] + 1;
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] === op2.accessPath[tpt]['' + tpt]) {
    if (op1.accessPath.length > op2.accessPath.length) {
      op1.accessPath[tpt]['' + tpt] = op1.accessPath[tpt]['' + tpt] + 1;
      return [op1, op2];
    }

    if (op1.accessPath.length < op2.accessPath.length) {
      op2.accessPath[tpt]['' + tpt] = op2.accessPath[tpt]['' + tpt] + 1;
      return [op1, op2];
    }

    if (op1.accessPath.length === op2.accessPath.length) {
      // application depndent priorities
      op1.accessPath[tpt]['' + tpt] = op1.accessPath[tpt]['' + tpt] + 1;
      return [op1, op2];
    }
  }

  return [op1, op2];
}

function xformTid(op1, op2) {
  let tpt = transformationPoint(op1.accessPath, op2.accessPath);

  if (effectIndependent(op1.accessPath, op2.accessPath)) {
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] > op2.accessPath[tpt]['' + tpt]) {
    op1.accessPath[tpt]['' + tpt] = op1.accessPath[tpt]['' + tpt] - 1;
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] < op2.accessPath[tpt]['' + tpt]) {
    op2.accessPath[tpt]['' + tpt] = op2.accessPath[tpt]['' + tpt] + 1;
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] === op2.accessPath[tpt]['' + tpt]) {
    if (op1.accessPath.length > op2.accessPath.length) {
      op1.type = 'no-op';
      return [op1, op2];
    }

    op2.accessPath[tpt]['' + tpt] = op2.accessPath[tpt]['' + tpt] + 1;
    return [op1, op2];
  }

  return [op1, op2];
}

function xformTdd(op1, op2) {
  let tpt = transformationPoint(op1.accessPath, op2.accessPath);

  if (effectIndependent(op1.accessPath, op2.accessPath)) {
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] > op2.accessPath[tpt]['' + tpt]) {
    op1.accessPath[tpt]['' + tpt] = op1.accessPath[tpt]['' + tpt] - 1;
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] < op2.accessPath[tpt]['' + tpt]) {
    op2.accessPath[tpt]['' + tpt] = op2.accessPath[tpt]['' + tpt] - 1;
    return [op1, op2];
  }

  if (op1.accessPath[tpt]['' + tpt] === op2.accessPath[tpt]['' + tpt]) {
    if (op1.accessPath.length > op2.accessPath.length) {
      op1.type = 'no-op';
      return [op1, op2];
    }

    if (op1.accessPath.length < op2.accessPath.length) {
      op2.type = 'no-op';
      return [op1, op2];
    }

    if (op1.accessPath.length === op2.accessPath.length) {
      op1.type = 'no-op';
      op2.type = 'no-op';
      return [op1, op2];
    }
  }

  return [op1, op2];
}

function xformT(op1, op2, isServer) {
  if (op1.type === 'insert') {
    if (op2.type === 'insert') {
      return xformTii(op1, op2, isServer);
    }
    if (op2.type === 'delete') {
      return xformTid(op1, op2);
    }
  }
  if (op1.type === 'delete') {
    if (op2.type === 'insert') {
      let xformed = xformTid(op2, op1);

      return [xformed[1], xformed[0]];
    }
    if (op2.type === 'delete') {
      return xformTdd(op1, op2);
    }
  }

  // in case of other operation types (no-op)
  return [op1, op2];
}

export default xformT;
