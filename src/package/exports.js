if (module) {
  module.exports = {
    // calculus/differential-equations
    ode,
    // calculus/differentiation
    diff, taylorSeries, gradient, findExtremum,
    // calculus/integration
    integrate, discreteIntegral, summation,
    // calculus/interpolation
    polynomial, partialBell, findRoot, findRoots, spline,
    // calculus/transformation
    fourierSinCoefficient, fourierCosCoefficient,
    // constants
    defaultDecimals, pi, eulerGamma, constants, getConstant,
    bernoulli2nN, bernoulli2nD, factorialCache,
    // functions/bessel
    besselJ, besselJZero, besselY, besselYZero, besselI, besselK, hankel1, hankel2,
    airyAi, airyAiPrime, airyBi, airyBiPrime,
    sphericalBesselJ, sphericalBesselY, sphericalHankel1, sphericalHankel2, struveH, struveL,
    // functions/elliptic-functions
    jacobiTheta, ellipticNome, fundamentalParallelogram, sn, cn, dn, am,
    weierstrassRoots, weierstrassHalfPeriods, weierstrassInvariants, weierstrassP, weierstrassPPrime,
    inverseWeierstrassP, kleinJ,
    // functions/elliptic-integrals
    carlsonRC, carlsonRD, carlsonRF, carlsonRG, carlsonRJ,
    ellipticF, ellipticK, ellipticE, ellipticPi, jacobiZeta,
    // functions/gamma
    factorial, factorial2, binomial, pochhammer, logGamma, gamma, gammaRegularized,
    beta, betaRegularized, polygamma, digamma, erf, erfc, erfi,
    fresnelS, fresnelC, expIntegralEi, logIntegral,
    sinIntegral, cosIntegral, sinhIntegral, coshIntegral, expIntegralE,
    // functions/hypergeometric
    hypergeometric0F1, hypergeometric1F1, hypergeometricU,
    whittakerM, whittakerW,
    hypergeometric2F0, hypergeometric2F1, hypergeometric1F2, hypergeometricSeries, hypergeometricPFQ,
    // functions/logarithm
    exp, log, ln, lambertW, inverseLambertW,
    // functions/miscellaneous
    chop, round, ceiling, floor, sign, integerPart, fractionalPart, kronecker, piecewise,
    // functions/orthogonal
    hermite, laguerre, chebyshevT, chebyshevU, legendreP, sphericalHarmonic, legendreQ,
    // functions/proprietary
    doubleLambert,
    // functions/trigonometry
    sin, cos, tan, cot, sec, csc, arcsin, arccos, arctan, arccot, arcsec, arccsc,
    sinh, cosh, tanh, coth, sech, csch, arcsinh, arccosh, arctanh, arccoth, arcsech, arccsch,
    sinc, haversine, inverseHaversine, gudermannian, inverseGudermannian,
    // functions/zeta
    zeta, dirichletEta, bernoulli, harmonic, hurwitzZeta, polylog,
    // matrices/eigensystems
    eigensystem, tridiagonalForm, tridiagonalQL, hessenbergForm,
    // matrices/linear-algebra
    luDecomposition, luSolve, determinant, inverse,
    // matrices/matrix
    vector, matrix, identity, transpose, matrixAdd, matrixSub, matrixMul,
    // operators
    complex, isComplex, setPrecisionScale, resetPrecisionScale, arbitrary,
    isArbitrary, isZero, isUnity, isInteger, isPositiveInteger, isPositiveIntegerOrZero,
    isNegativeInteger, isNegativeIntegerOrZero, isEqualTo,
    re, im, abs, arg, add, sub, mul, neg, div, inv, pow, root, surd, sqrt,
    complexAverage, complexFromString, output,
  };
}
