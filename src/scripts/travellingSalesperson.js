export const travellingSalesperson = async (matrix, resultType) => {
    const N = matrix.length;
    let memo = makeArray(N, Math.pow(2, N), -1);
    let pathState = makeArray(N, Math.pow(2, N), 0);
    let FINAL_STATE = (1 << N) - 1;
    let cost = await helper(matrix, pathState, memo, FINAL_STATE, N, 1, 0);
    let path = listOptimalPath(pathState);
    if(resultType === "cost") {
        return cost;
    } 
    return path;
}

const listOptimalPath = (pathState) => {
    let optimalPath = [];
    let index = 0;
    let position = 1;
    while (true) {
      optimalPath.push(index);
      let nextIndex = pathState[position][index];
      if (nextIndex === 0) break;
      let nextPosition = position | (1 << nextIndex);
      position = nextPosition;
      index = nextIndex;
    }
    optimalPath.push(0);
    return optimalPath;
}

const helper = async (matrix, pathState, memo, FINAL_STATE, N, visited, position) => {
    if (visited === FINAL_STATE) {
        return matrix[position][0];
    } else if (memo[visited][position] !== -1) {
        return memo[visited][position];
    }
    let min = Number.MAX_SAFE_INTEGER;
    let index = -1;
    for (let i = 0; i < N; i++) {
        if (visited & (1 << i) === 0) {
            let ans = matrix[position][i] + await helper(matrix, pathState, memo, FINAL_STATE, N, visited | (1 << i), i);
            if (ans < min) {
                min = ans;
                index = i;
            }
        }
    }

    pathState[visited][position] = index;
    return memo[visited][position] = min;
}

const makeArray = (w, h, val) => {
    var arr = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}
