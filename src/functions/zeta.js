
function zeta( x, tolerance=1e-10 ) {

  // direct summation fast in right-hand plane
  var directSummation = 5;

  if ( x > directSummation || x.re > directSummation ) {

    if ( isComplex(x) ) {

      var s = complex(1);
      var p = complex(1);
      var i = 2;

      while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance*tolerance ) {
        p = pow( i, neg(x) );
        s = add( s, p );
        i++;
      }

      return s;

    } else {

      var s = 1;
      var p = 1;
      var i = 2;

      while ( Math.abs(p) > tolerance ) {
        p = 1 / i**x;
        s += p;
        i++;
      }

      return s;

    }

  }

  // Borwein, Efficient Algorithm

  var n = 14; // from error bound for tolerance

  // Borwein p.3 simplified
  if ( isComplex(x) && x.im !== 0 )
    n = Math.max( n, Math.ceil( log( 2 / abs(gamma(x)) / tolerance ) / 1.5 ) );

  var d = [ 1 ];
  for ( var i = 1 ; i <= n ; i++ )
    // order of multiplication reduces overflow, but factorial overflows at 171
    d.push( d[i-1] + n * factorial( n+i-1 ) / factorial( n-i ) / factorial( 2*i ) * 4**i );

  if ( isComplex(x) ) {

    // functional equation dlmf.nist.gov/25.4.2
    if ( x.re < 0 )
      return mul( pow(2,x), pow(pi,sub(x,1)), sin( mul(pi/2,x) ), gamma( sub(1,x) ), zeta( sub(1,x) ) );

    var s = summation( k => div( (-1)**k * ( d[k] - d[n] ), pow( k+1, x ) ), [0,n-1] );

    return div( div( s, -d[n] ), sub( 1, pow( 2, sub(1,x) ) ) );

  } else {

    // functional equation dlmf.nist.gov/25.4.2
    if ( x < 0 ) return 2**x * pi**(x-1) * sin(pi*x/2) * gamma(1-x) * zeta(1-x);

    var s = summation( k => (-1)**k * ( d[k] - d[n] ) / (k+1)**x, [0,n-1] );

    return -s / d[n] / ( 1 - 2**(1-x) );

  }

}

function dirichletEta( x ) { return mul( zeta(x), sub( 1, pow( 2, sub(1,x) ) ) ); }


function bernoulli( n ) {

  if ( !Number.isInteger(n) ) throw Error( 'Noninteger argument for Bernoulli number' );

  if ( n < 0 ) throw Error( 'Unsupported argument for Bernoulli number' );

  if ( n === 0 ) return 1;

  if ( n === 1 ) return -.5;

  if ( n & 1 ) return 0;

  return (-1)**(n+1) * n * zeta(-n+1);

}

function harmonic( n ) {

  if ( !Number.isInteger(n) ) throw Error( 'Noninteger argument for harmonic number' );

  if ( n > 1e3 ) return log(n) + eulerGamma + 1/2/n - 1/12/n**2;

  return summation( i => 1/i, [1,n] );

}


function hurwitzZeta( x, a, tolerance=1e-10 ) {

  if ( isComplex(x) || isComplex(a) ) {

    if ( !isComplex(x) ) x = complex(x);
    if ( !isComplex(a) ) a = complex(a);

    if ( x.re === 1 && x.im === 0 ) throw Error( 'Hurwitz zeta pole' );

    // dlmf.nist.gov/25.11.4

    if ( a.re > 1 ) {
      var m = Math.floor(a.re);
      a = sub( a, m );
      return sub( hurwitzZeta(x,a), summation( i => pow( add(a,i), neg(x) ), [0,m-1] ) );
    }

    if ( a.re < 0 ) {
      var m = -Math.floor(a.re);
      return add( hurwitzZeta(x,add(a,m)), summation( i => pow( add(a,i), neg(x) ), [0,m-1] ) );
    }

    // Euler-Maclaurin has differences of large values in left-hand plane
    // but different summation (dlmf.nist.gov/25.11.9) does not converge for complex a
    // to be improved...

    var switchForms = -5;

    if ( x.re < switchForms ) throw Error( 'Currently unsuppported complex Hurwitz zeta' );
/*
      x = sub( 1, x );
      var t = cos( sub( mul(pi/2,x), mul(2*pi,a) ) );
      var s = t;
      var i = 1;

      while ( Math.abs(t.re) > tolerance || Math.abs(t.im) > tolerance ) {
        i++;
        t = div( cos( sub( mul(pi/2,x), mul(2*i*pi,a) ) ), pow(i,x) );
        s = add( s, t );
      }

      return mul( 2, gamma(x), pow(2*pi,neg(x)), s );

    }
*/
    // Johansson arxiv.org/abs/1309.2877

    var n = 15; // recommendation of Vepstas, Efficient Algorithm, p.12

    var S = summation( i => pow( add(a,i), neg(x) ), [0,n-1] );

    var I = div( pow( add(a,n), sub(1,x) ), sub(x,1) );

    var p = mul( .5, x, inv(add(a,n)) );
    var t = mul( bernoulli(2), p );
    var i = 1;

    // converges rather quickly
    while ( Math.abs(p.re) > tolerance || Math.abs(p.im) > tolerance ) {
      i++;
      p = mul ( p, add( x, 2*i - 2 ), add( x, 2*i - 3 ), inv( mul( 2*i * (2*i-1), pow( add(a,n), 2 ) ) ) );
      t = add( t, mul( bernoulli(2*i), p ) );
    }

    var T = div( add( .5, t ), pow( add(a,n), x ) );

    return add( S, I, T );

  } else {

    if ( x === 1 ) throw Error( 'Hurwitz zeta pole' );

    // dlmf.nist.gov/25.11.4

    if ( a > 1 ) {
      var m = Math.floor(a);
      a -= m;
      return hurwitzZeta(x,a) - summation( i => 1 / (a+i)**x, [0,m-1] );
    }

    if ( a < 0 ) return hurwitzZeta( x, complex(a) );

    // Euler-Maclaurin has differences of large values in left-hand plane
    // switch to different summation: dlmf.nist.gov/25.11.9

    var switchForms = -5;

    if ( x < switchForms ) {

      x = 1 - x;
      var t = Math.cos( pi*x/2 - 2*pi*a );
      var s = t;
      var i = 1;

      while ( Math.abs(t) > tolerance ) {
        i++;
        t = Math.cos( pi*x/2 - 2*i*pi*a ) / i**x;
        s += t;
      }

      return 2 * gamma(x) / (2*pi)**x * s;

    }

    // Johansson arxiv.org/abs/1309.2877

    var n = 15; // recommendation of Vepstas, Efficient Algorithm, p.12

    var S = summation( i => 1 / (a+i)**x, [0,n-1] );

    var I = (a+n)**(1-x) / (x-1);

    var p = x / 2 / (a+n);
    var t = bernoulli(2) * p;
    var i = 1;

    // converges rather quickly
    while ( Math.abs(p) > tolerance ) {
      i++;
      p *= ( x + 2*i - 2 ) * ( x + 2*i - 3 ) / ( 2*i * (2*i-1) * (a+n)**2 );
      t += bernoulli(2*i) * p;
    }

    var T = ( .5 + t ) / (a+n)**x;

    return S + I + T;

  }

}

