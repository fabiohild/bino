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
  },
  categoryTextColor() {
    if (this.category == "transito")
      return "text-info fa-car"
    else if (this.category == "suspeitas")
      return "fa-user-secret"
    else if (this.category == "servicos")
      return "text-success fa-wrench"
    else if (this.category == "acidentes")
      return "text-warning fa-tachometer"
    else if (this.category == "seguranca")
      return "text-danger fa-hand-paper-o"
    else if (this.category == "condicoes")
      return "text-primary fa-road"
    return "text-muted fa-exclamation-triangle"
  }
});