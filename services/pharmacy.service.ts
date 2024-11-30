import ApiService from "./api-service.service";

export class PharmacyService {
  static pharmacies = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/pharmacy",
    });
  };
}
