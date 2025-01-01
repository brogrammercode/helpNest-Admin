export class UserLocationEntity {
    constructor({
        city,
        area,
        pincode,
        locality,
        state,
        country,
        continent,
        geopoint,
    }) {
        this.city = city;
        this.area = area;
        this.pincode = pincode;
        this.locality = locality;
        this.state = state;
        this.country = country;
        this.continent = continent;
        this.geopoint = geopoint;
    }
}

export class UserEntity {
    constructor({
        id,
        name,
        phoneNumber,
        location,
        image,
        gender,
        creationTD,
        createdBy,
        deactivate,
    }) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.image = image;
        this.gender = gender;
        this.creationTD = creationTD;
        this.createdBy = createdBy;
        this.deactivate = deactivate;
    }
}
