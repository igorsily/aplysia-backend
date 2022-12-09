import { Response } from 'express';

class HttpResponse {
  static Ok = async (message: string, response: Response) => {
    return response.status(200).json({ message });
  };

  static NoContent = async (response: Response) => {
    return response.status(204).json();
  };

  static Created = async (data: Record<string, any>, response: Response) => {
    return response.status(201).json(data);
  };

  static Send = async (data: Record<string, any>, response: Response) => {
    return response.status(200).json(data);
  };

  static Unauthorized = async (message: string, response: Response) => {
    return response.status(401).json({ message });
  };

  static Forbidden = async (message: string, response: Response) => {
    return response.status(403).json({ message });
  };

  static NotFound = async (message: string, response: Response) => {
    return response.status(404).json({ message });
  };

  static BadRequest = async (message: string, response: Response) => {
    return response.status(400).json({ message });
  };

  static BadRequestData = async (data: Record<string, any>, response: Response) => {
    return response.status(400).json(data);
  };

  static ServerError = async (message: string, response: Response) => {
    return response.status(500).json({ message });
  };
}
export default HttpResponse;
