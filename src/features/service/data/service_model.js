import { Timestamp } from "firebase/firestore";

export class ServiceModel {
    constructor({
        id,
        name,
        logo,
        description,
        creationTD,
        createdBy,
        deactivate,
        avgCharge,
        avgTime,
        slides,
    }) {
        this.id = id ?? '';
        this.name = name ?? '';
        this.logo = logo ?? '';
        this.description = description ?? '';
        this.creationTD = creationTD ?? Timestamp.now();
        this.createdBy = createdBy ?? '';
        this.deactivate = deactivate ?? false;
        this.avgCharge = avgCharge ?? 0;
        this.avgTime = avgTime ?? '';
        this.slides = slides ?? [];
    }

    static fromJson(json) {
        return new ServiceModel({
            id: json.id ?? '',
            name: json.name ?? '',
            logo: json.logo ?? '',
            description: json.description ?? '',
            creationTD: json.creationTD ? Timestamp.fromDate(new Date(json.creationTD)) : Timestamp.now(),
            createdBy: json.createdBy ?? '',
            deactivate: json.deactivate ?? false,
            avgCharge: json.avgCharge ?? 0,
            avgTime: json.avgTime ?? '',
            slides: json.slides ?? [],
        });
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            logo: this.logo,
            description: this.description,
            creationTD: this.creationTD.toDate(),
            createdBy: this.createdBy,
            deactivate: this.deactivate,
            avgCharge: this.avgCharge,
            avgTime: this.avgTime,
            slides: this.slides,
        };
    }

    copyWith({
        id,
        name,
        logo,
        description,
        creationTD,
        createdBy,
        deactivate,
        avgCharge,
        avgTime,
        slides,
    }) {
        return new ServiceModel({
            id: id ?? this.id,
            name: name ?? this.name,
            logo: logo ?? this.logo,
            description: description ?? this.description,
            creationTD: creationTD ?? this.creationTD,
            createdBy: createdBy ?? this.createdBy,
            deactivate: deactivate ?? this.deactivate,
            avgCharge: avgCharge ?? this.avgCharge,
            avgTime: avgTime ?? this.avgTime,
            slides: slides ?? this.slides,
        });
    }

    toString() {
        return `ServiceModel(id: ${this.id}, name: ${this.name}, logo: ${this.logo}, description: ${this.description}, creationTD: ${this.creationTD.toDate()}, createdBy: ${this.createdBy}, deactivate: ${this.deactivate}, avgCharge: ${this.avgCharge}, avgTime: ${this.avgTime}, slides: ${this.slides})`;
    }
}
