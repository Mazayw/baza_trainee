import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface IAuthenticatedRequest extends Request {
	userId?: string;
}

export interface IDocumentResult<T> {
	_doc: T;
}

export interface IUser extends IDocumentResult<IUser> {
	_id: ObjectId;
	createdAt: Date;
	updatedAt: Date;
	name: string;
	email: string;
	passwordHash: string;
}

export interface ITestimonial extends IDocumentResult<ITestimonial> {
	name: string;
	review: string;
	date: number;
	imageUrl: string;
	createdAt: Date;
	updatedAt: Date;
}
