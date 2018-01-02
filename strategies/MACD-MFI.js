/*

  MACD - DJM 31/12/2013

  (updated a couple of times since, check git history)

 */

// helpers
var _ = require('lodash');
var log = require('../core/log.js');

// let's create our own method
var method = {};

// prepare everything our method needs
method.init = function() {
  // keep state about the current trend
  // here, on every new candle we use this
  // state object to check if we need to
  // report it.
  this.trend = {
    direction: 'none',
    duration: 0,
    persisted: false,
    adviced: false
  };

  this.mfi = {
      result: 0,
      overbought: 'overbought',
      oversold: 'oversold',
  };

  // how many candles do we need as a base
  // before we can start giving advice?
  this.requiredHistory = this.tradingAdvisor.historySize;

  // define the indicators we need
  this.addIndicator('macd', 'MACD', this.settings);
  this.addTulipIndicator('_mfi', 'mfi', this.settings);
  
}

// what happens on every new candle?
method.update = function(candle) {
  // nothing!
  this.mfi.result = this.tulipIndicators._mfi.result.result;
  
}

// for debugging purposes: log the last calculated
// EMAs and diff.
method.log = function() {
  var digits = 8;
  var macd = this.indicators.macd;
  var mfi = (this.mfi.result) ? this.mfi.result : 0;

  var diff = macd.diff;
  var signal = macd.signal.result;

  log.debug('calculated MFI properties for candle:');  
  log.debug('\t', 'mfi:', mfi.toFixed(digits), '\n');
  log.debug('calculated MACD properties for candle:');
  log.debug('\t', 'short:', macd.short.result.toFixed(digits));
  log.debug('\t', 'long:', macd.long.result.toFixed(digits));
  log.debug('\t', 'macd:', diff.toFixed(digits));
  log.debug('\t', 'signal:', signal.toFixed(digits));
  log.debug('\t', 'macdiff:', macd.result.toFixed(digits), '\n');
}


method.check = function() {
  var macddiff = this.indicators.macd.result;

/*
*  Trade Bot Logic : 
*  Check MACD Trend is now upward/positive 
*/
  if(macddiff > this.settings.thresholds.up) {
    // new trend detected
    if(this.trend.direction !== 'up')
      // reset the state for the new trend
      this.trend = {
        duration: 0,
        persisted: false,
        direction: 'up',
        adviced: false
      };

    this.trend.duration++;

    log.debug('In uptrend since', this.trend.duration, 'candle(s)');
    
    if(this.trend.duration >= this.settings.thresholds.persistence)
      this.trend.persisted = true;

    /*
    *  Trade Bot Logic : 
    *  Check MFI for OverBought & MACD Trend Presisted & Not Adviced
    */

    if(this.mfi.result <= this.settings.thresholds.overbought && this.trend.persisted && !this.trend.adviced) {
      log.debug('Buy');
      this.trend.adviced = true;
      this.advice('long');
    } else
      this.advice();


    /*
    *  Trade Bot Logic : 
    *  Check MACD Trend is now downward/negative
    */

  } else if(macddiff < this.settings.thresholds.down) {

    // new trend detected
    if(this.trend.direction !== 'down')
      // reset the state for the new trend
      this.trend = {
        duration: 0,
        persisted: false,
        direction: 'down',
        adviced: false
      };

    this.trend.duration++;

    log.debug('In downtrend since', this.trend.duration, 'candle(s)');
    
    if(this.trend.duration >= this.settings.thresholds.persistence)
      this.trend.persisted = true;

    /*
    *  Trade Bot Logic : 
    *  Check MFI for Oversold & MACD Trend Presisted & Not Adviced
    */
    
    if(this.mfi.result <= this.settings.thresholds.oversold && this.trend.persisted && !this.trend.adviced) {
      log.debug('Sell');  
      this.trend.adviced = true;
      this.advice('short');
    } else
      this.advice();

  } else {
    log.debug('In no trend');
    
    // we're not in an up nor in a downtrend
    // but for now we ignore sideways trends
    //
    // read more @link:
    //
    // https://github.com/askmike/gekko/issues/171

    // this.trend = {
    //   direction: 'none',
    //   duration: 0,
    //   persisted: false,
    //   adviced: false
    // };

    this.advice();
  }
}

module.exports = method;
