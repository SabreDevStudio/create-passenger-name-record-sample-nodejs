class PassengerNameRecordView {
  constructor(pnrModel) {
    this.pnrModel = pnrModel;
  }

  renderPNR() {
    console.log(`Your PNR is [${this.pnrModel.pnr}]`);
  }

  reportStatus() {
    console.log(`API response status is [${this.pnrModel.status}]`);
  }

  renderAnyErrors() {
    const errors = this.pnrModel.bookingInfo.ApplicationResults.Error;

    if (errors) {
      console.log(`There are ${errors.length} errors`);
    }
  }

  static renderFooter() {
    console.log('\n\n');
  }

  render() {
    this.reportStatus();
    this.renderPNR();
    this.renderAnyErrors();
    PassengerNameRecordView.renderFooter();
  }
}

module.exports = PassengerNameRecordView;
