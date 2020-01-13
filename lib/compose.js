function compose(...fns) {
  return fns.reduceRight(
    (prevFn, nextFn) => (...args) => nextFn(prevFn(...args)),
    (value) => value
  );
}

module.exports = compose;
