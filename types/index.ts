import { Request } from 'express';
import { ObjectId, Types } from 'mongoose';

export interface ILanguageSelector {
	en: string;
	pl: string;
	ua: string;
}

export interface IAuthenticatedRequest extends Request {
	userId?: string;
}

export interface IDocumentResult<T> {
	_doc: T;
}

export interface IUser extends IDocumentResult<IUser> {
	_id: ObjectId;
	name: string;
	email: string;
	passwordHash: string;
}

export interface IToken extends IDocumentResult<IToken> {
	userId: ObjectId;
	token: string;
	createdAt: Date;
}

export interface ITestimonial extends IDocumentResult<ITestimonial> {
	name: ILanguageSelector;
	review: ILanguageSelector;
	role: string;
	date: number;
	imageUrl: string;
}

export interface ITeamMember extends IDocumentResult<ITestimonial> {
	name: string;
	profileUrl?: string;
}

export interface ITeamMemberRole extends IDocumentResult<ITeamMemberRole> {
	name: ILanguageSelector;
}

export interface IProjectTeamMember {
	userId: {
		_id: Types.ObjectId;
		name?: string;
	};
	roleId: {
		_id: Types.ObjectId;
		name?: string;
	};
}

export interface IProject extends IDocumentResult<IProject> {
	title: ILanguageSelector;
	imageUrl: string;
	deployUrl?: string;
	isTeamRequired: boolean;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: Partial<IProjectTeamMember>[];
	_id: Types.ObjectId;
}

export interface IPartner extends IDocumentResult<IPartner> {
	homeUrl?: string;
	imageUrl: string;
	name: string;
}

export interface IContacts extends IDocumentResult<IContacts> {
	contacts: {
		contactsDataList: {
			phone1: number;
			phone2: number;
			email: string;
		};
		socialsMediaList: {
			linkedin: string;
			facebook: string;
		};
	};
}

export interface IDocs extends IDocumentResult<IDocs> {
	docs: {
		report: string;
		statute: string;
		privacyPolicy: ILanguageSelector;
		termsOfUse: ILanguageSelector;
	};
}

export interface IAchievements {
	employed: {
		type: number;
	};
}

export interface IProjectResponse {
	title: ILanguageSelector;
	_id: string;
	imageUrl: string;
	deployUrl?: string;
	isTeamRequired: boolean;
	creationDate: number;
	launchDate: number;
	complexity: number;
	teamMembers: Array<{
		user: {
			name: string;
			_id: string;
		};
		role: {
			name: string;
			_id: string;
		};
	}>;
}

export interface IHeroSlider extends IDocumentResult<IHeroSlider> {
	title: ILanguageSelector;
	subtitle: ILanguageSelector;
	imageUrl: string;
}

export interface IArticle {
  img: string;
  title: string;
  description: string;
  link: string;
  date: number;
}