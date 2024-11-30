import ApiService from "./api-service.service";

export class DrugService {
  static drugs = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/drugs",
    });
  };
}
