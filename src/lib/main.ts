import axios, { AxiosResponse } from "axios";
import {
  createSystemConfigDto,
  CreatePrinterDto,
  UpdatePaperAfterPrintingDto,
  UpdatePrinter,
  printFileDto,
  CreateUserDto,
  GetCountDto,
  GetPrinterToPrintDto,
  LoginInfoDto,
} from "./interface";

const hostURL = "htpp://localhost:3000/v1";

const customHeader = (token: string | null) => {
  if (token) {
    return {
      withCredentials: true,
      validateStatus: (status: any) => status >= 200 && status <= 500,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return {
    withCredentials: true,
    validateStatus: (status: any) => status >= 200 && status <= 500,
  };
};

const processResponse = (response: AxiosResponse) => {
  return {
    success: response.data.success,
    message: response.data.message,
    data: response.data.data,
    status: response.status,
  };
};

const processError = (error: any) => {
  return {
    success: error?.response?.data,
    request: error?.request,
    status: error.response ? error.response.status : null,
  };
};

export class SystemConfiguration {
  private baseUrl: string;
  constructor() {
    this.baseUrl = `${hostURL}/systemConfiguration`;
  }

  async createSystemConfiguration(
    createInfo: createSystemConfigDto,
    token: string
  ) {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/create`,
        createInfo,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getAllSystemConfiguration(token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/searchAll`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getNewestSystemConfiguration(token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/searchNewest`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}

export class Printer {
  private baseUrl: string;
  constructor() {
    this.baseUrl = `${hostURL}/printer`;
  }

  async createPrinter(createPrinterInfo: CreatePrinterDto, token: string) {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/create`,
        createPrinterInfo,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async searchPrinter(token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/search`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async updatePaperAfterPrinting(
    updateInfo: UpdatePaperAfterPrintingDto,
    token: string
  ) {
    try {
      const response: AxiosResponse = await axios.put(
        `${this.baseUrl}/update-paper-after-printing`,
        updateInfo,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async updatePrinter(updateInfo: UpdatePrinter, token: string) {
    try {
      const response: AxiosResponse = await axios.put(
        `${this.baseUrl}/update`,
        updateInfo,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getNumberOfPrinter(payload: GetCountDto, token: string) {
    try {
      const response: AxiosResponse = await axios.get(`${this.baseUrl}/count`, {
        params: payload,
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getPrinterToPrint(payload: GetPrinterToPrintDto, token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/searchToPrint`,
        {
          params: payload,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async deletePrinter(printer_id: number, token: string) {
    try {
      const response: AxiosResponse = await axios.delete(
        `${this.baseUrl}/delete`,
        {
          params: {
            id: printer_id,
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}

export class FileOperation {
  private baseUrl: string;
  constructor() {
    this.baseUrl = `${hostURL}/file`;
  }

  async uploadFile(fileUpload: File, printInfo: printFileDto, token: string) {
    try {
      const formData = new FormData();
      formData.append("file", fileUpload);

      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}`,
        printInfo,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getFile(fileId: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/${fileId}`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}

export class History {
  private baseUrl: string;
  constructor() {
    this.baseUrl = `${hostURL}/printingHistory`;
  }

  async viewPrintingHistory(student_id: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/view/${student_id}`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}

export class User {
  private baseUrl: string;
  constructor() {
    this.baseUrl = `${hostURL}/user`;
  }

  async createUser(createInfo: CreateUserDto, token: string) {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/create`,
        createInfo,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getPaper(student_id: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/paper/search/${student_id}`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }

  async getInfo(student_id: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/search/${student_id}`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}

export class Payment {
  private baseUrl: string;
  constructor() {
    this.baseUrl = `${hostURL}/payment`;
  }

  async viewPayment(student_id: string, token: string) {
    try {
      const response: AxiosResponse = await axios.get(
        `${this.baseUrl}/view/${student_id}`,
        customHeader(token)
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}

export class Auth {
  private baseUrl: string;

  constructor() {
    console.log("GỌI AUTH");
    this.baseUrl = `${hostURL}/auth`;
  }

  async login(payload: LoginInfoDto) {
    console.log("Tronglogin");
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/login`,
        payload
      );
      console.log(response);

      return processResponse(response);
    } catch (error) {
      console.log("Tronglogin");
      console.log(error);
      processError(error);
    }
  }

  async signup(createInfo: CreateUserDto) {
    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseUrl}/signup`,
        createInfo
      );

      return processResponse(response);
    } catch (error) {
      processError(error);
    }
  }
}
