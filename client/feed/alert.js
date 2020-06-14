
Template.alert.helpers({
    getAddress() {
    if (this.geolocation)
      return this.geolocation[0].formattedAddress
    else
      return "Localização indisponível"
    },
    getMoment() {
        moment.locale('pt-br');
        return moment(this.timestamp).from(Session.get("currentTime"), true)
    }
  });