import { Request } from 'express';
import { ObjectId, Types } from 'mongoose';

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

export interface ITeamMember extends IDocumentResult<ITestimonial> {
	name: string;
	profileUrl?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ITeamMemberRole extends IDocumentResult<ITeamMemberRole> {
	name: string;
}

interface IProjectTeamMember {
	user: {
		_id: Types.ObjectId;
		name: string;
	};
	role: {
		_id: Types.ObjectId;
		name: string;
	};
}

export interface IProject extends IDocumentResult<IProject> {
	title: string;
	imageUrl: string;
	status: string;
	description: string;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: IProjectTeamMember[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IPartner extends IDocumentResult<IPartner> {
	name: string;
	homeUrl?: string;
	imageUrl: string;
	createdAt: Date;
	updatedAt: Date;
}
