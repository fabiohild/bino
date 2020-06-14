Template.alert.helpers({
    getAddress() {
    if (this.geolocation)
      return this.geolocation[0].formattedAddress
    else
      return "Localização indisponível"
    },
    getMoment() {
        console.log(this)
        moment.locale('pt-br');
        return moment(this.timestamp).fromNow()
    }
  });