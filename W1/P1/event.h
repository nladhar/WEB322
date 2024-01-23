/***********************************************************************
// OOP345 Workshop #1 (part 1):
//
// File  event.h
// Author  Nehmat Ladhar
// I have done all the coding by myself and only copied the code that my
// professor provided to complete my workshops and assignments.
// -----------------------------------------------------------
// Name  Nehmat Ladhar               Date  23 January 2024       email : nladhar@myseneca.ca
***********************************************************************/
#pragma once
#ifndef SENECA_EVENT_H
#define SENECA_EVENT_H

namespace seneca {
	extern size_t g_sysClock;   //Global variables
	extern size_t index;

	class Event {
		char desc[129];        //C-style string to store the description - 128 characters
		size_t time;           //Store the time

	public:
		Event();               //Default constructor
		void display() const;  //Print event information
		void set(char* ch = nullptr); //Update event information
	};
}
#endif