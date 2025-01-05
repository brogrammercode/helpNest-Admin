import { collection, getDocs, setDoc, getFirestore, doc } from "firebase/firestore";
import { ServiceModel } from "./service_model";
import { ReUsableMethods } from "../../../core/reusable_methods";

class ServiceRemoteDs {
    constructor() {
        this.db = getFirestore();
        this.servicesCollection = collection(this.db, "services");
    }

    async getAllServices() {
        try {
            const serviceDocs = await getDocs(this.servicesCollection);
            const services = [];
            serviceDocs.forEach((doc) => {
                services.push(ServiceModel.fromJson({ id: doc.id, ...doc.data() }));
            });
            return services;
        } catch (error) {
            throw error;
        }
    }

    async setService(service, file1, file2) {
        try {
            if (!(service instanceof ServiceModel)) {
                throw new Error("Parameter must be an instance of ServiceModel.");
            }

            const file1Url = await ReUsableMethods.uploadFileAndGetUrl({
                file: file1,
                path: `services/${service.id}/slide1.png`,
            });

            const file2Url = await ReUsableMethods.uploadFileAndGetUrl({
                file: file2,
                path: `services/${service.id}/slide2.png`,
            });

            // Assuming service.slides is an array that holds the image URLs
            service.slides = [file1Url, file2Url];

            const serviceDocRef = doc(this.servicesCollection, service.id);
            await setDoc(serviceDocRef, service.toJson(), { merge: true });
        } catch (error) {
            throw error;
        }
    }
}

export default ServiceRemoteDs;
