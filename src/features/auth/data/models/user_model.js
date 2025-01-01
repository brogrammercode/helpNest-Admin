import { Timestamp, GeoPoint } from 'firebase/firestore';
import { UserEntity, UserLocationEntity } from '../../domain/entities/user_entity';

export class UserModel extends UserEntity {
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
    super({
      id,
      name,
      phoneNumber,
      location,
      image,
      gender,
      creationTD,
      createdBy,
      deactivate,
    });
  }

  static fromJson(json) {
    const location = new UserLocationModel({
      city: json.location.city ?? '',
      area: json.location.area ?? '',
      pincode: json.location.pincode ?? '',
      locality: json.location.locality ?? '',
      state: json.location.state ?? '',
      country: json.location.country ?? '',
      continent: json.location.continent ?? '',
      geopoint: new GeoPoint(json.location.geopoint.latitude, json.location.geopoint.longitude),
    });

    return new UserModel({
      id: json.id ?? '',
      name: json.name ?? '',
      phoneNumber: json.phoneNumber ?? '',
      location,
      image: json.image ?? '',
      gender: json.gender ?? '',
      creationTD: json.creationTD ? Timestamp.fromDate(new Date(json.creationTD)) : Timestamp.now(),
      createdBy: json.createdBy ?? '',
      deactivate: json.deactivate ?? false,
    });
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      phoneNumber: this.phoneNumber,
      location: this.location.toJson(),
      image: this.image,
      gender: this.gender,
      creationTD: this.creationTD.toDate(),
      createdBy: this.createdBy,
      deactivate: this.deactivate,
    };
  }
}

export class UserLocationModel extends UserLocationEntity {
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
    super({
      city,
      area,
      pincode,
      locality,
      state,
      country,
      continent,
      geopoint,
    });
  }

  static fromJson(json) {
    return new UserLocationModel({
      city: json.city ?? '',
      area: json.area ?? '',
      pincode: json.pincode ?? '',
      locality: json.locality ?? '',
      state: json.state ?? '',
      country: json.country ?? '',
      continent: json.continent ?? '',
      geopoint: new GeoPoint(json.geopoint.latitude, json.geopoint.longitude),
    });
  }

  toJson() {
    return {
      city: this.city,
      area: this.area,
      pincode: this.pincode,
      locality: this.locality,
      state: this.state,
      country: this.country,
      continent: this.continent,
      geopoint: this.geopoint,
    };
  }
}
