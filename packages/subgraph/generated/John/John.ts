// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Confirmation extends ethereum.Event {
  get params(): Confirmation__Params {
    return new Confirmation__Params(this);
  }
}

export class Confirmation__Params {
  _event: Confirmation;

  constructor(event: Confirmation) {
    this._event = event;
  }

  get confirmedBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get verseId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class Donation extends ethereum.Event {
  get params(): Donation__Params {
    return new Donation__Params(this);
  }
}

export class Donation__Params {
  _event: Donation;

  constructor(event: Donation) {
    this._event = event;
  }

  get donor(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Verse extends ethereum.Event {
  get params(): Verse__Params {
    return new Verse__Params(this);
  }
}

export class Verse__Params {
  _event: Verse;

  constructor(event: Verse) {
    this._event = event;
  }

  get signer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get verseId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get verseNumber(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get chapterNumber(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get verseContent(): string {
    return this._event.parameters[4].value.toString();
  }
}

export class John__versesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: string;
  value4: boolean;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: string,
    value4: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    map.set("value4", ethereum.Value.fromBoolean(this.value4));
    return map;
  }

  getVerseId(): BigInt {
    return this.value0;
  }

  getVerseNumber(): BigInt {
    return this.value1;
  }

  getChapterNumber(): BigInt {
    return this.value2;
  }

  getVerseContent(): string {
    return this.value3;
  }

  getConfirmed(): boolean {
    return this.value4;
  }
}

export class John extends ethereum.SmartContract {
  static bind(address: Address): John {
    return new John("John", address);
  }

  confirmations(param0: Address, param1: BigInt): BigInt {
    let result = super.call(
      "confirmations",
      "confirmations(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_confirmations(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "confirmations",
      "confirmations(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  contractInEditMode(): boolean {
    let result = super.call(
      "contractInEditMode",
      "contractInEditMode():(bool)",
      []
    );

    return result[0].toBoolean();
  }

  try_contractInEditMode(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "contractInEditMode",
      "contractInEditMode():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  council(param0: BigInt): Address {
    let result = super.call("council", "council(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_council(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("council", "council(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  numberOfVerses(): BigInt {
    let result = super.call("numberOfVerses", "numberOfVerses():(uint256)", []);

    return result[0].toBigInt();
  }

  try_numberOfVerses(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "numberOfVerses",
      "numberOfVerses():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  verseConfirmations(param0: BigInt, param1: BigInt): Address {
    let result = super.call(
      "verseConfirmations",
      "verseConfirmations(uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toAddress();
  }

  try_verseConfirmations(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "verseConfirmations",
      "verseConfirmations(uint256,uint256):(address)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  verses(param0: BigInt): John__versesResult {
    let result = super.call(
      "verses",
      "verses(uint256):(uint256,uint256,uint256,string,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new John__versesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toString(),
      result[4].toBoolean()
    );
  }

  try_verses(param0: BigInt): ethereum.CallResult<John__versesResult> {
    let result = super.tryCall(
      "verses",
      "verses(uint256):(uint256,uint256,uint256,string,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new John__versesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toString(),
        value[4].toBoolean()
      )
    );
  }

  votedToExitEditMode(param0: BigInt): Address {
    let result = super.call(
      "votedToExitEditMode",
      "votedToExitEditMode(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_votedToExitEditMode(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "votedToExitEditMode",
      "votedToExitEditMode(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _contractOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _council(): Array<Address> {
    return this._call.inputValues[1].value.toAddressArray();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddBatchVersesCall extends ethereum.Call {
  get inputs(): AddBatchVersesCall__Inputs {
    return new AddBatchVersesCall__Inputs(this);
  }

  get outputs(): AddBatchVersesCall__Outputs {
    return new AddBatchVersesCall__Outputs(this);
  }
}

export class AddBatchVersesCall__Inputs {
  _call: AddBatchVersesCall;

  constructor(call: AddBatchVersesCall) {
    this._call = call;
  }

  get _verseNumber(): Array<BigInt> {
    return this._call.inputValues[0].value.toBigIntArray();
  }

  get _chapterNumber(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get _verseContent(): Array<string> {
    return this._call.inputValues[2].value.toStringArray();
  }
}

export class AddBatchVersesCall__Outputs {
  _call: AddBatchVersesCall;

  constructor(call: AddBatchVersesCall) {
    this._call = call;
  }
}

export class AddVerseCall extends ethereum.Call {
  get inputs(): AddVerseCall__Inputs {
    return new AddVerseCall__Inputs(this);
  }

  get outputs(): AddVerseCall__Outputs {
    return new AddVerseCall__Outputs(this);
  }
}

export class AddVerseCall__Inputs {
  _call: AddVerseCall;

  constructor(call: AddVerseCall) {
    this._call = call;
  }

  get _verseNumber(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _chapterNumber(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _verseContent(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class AddVerseCall__Outputs {
  _call: AddVerseCall;

  constructor(call: AddVerseCall) {
    this._call = call;
  }
}

export class ConfirmVerseCall extends ethereum.Call {
  get inputs(): ConfirmVerseCall__Inputs {
    return new ConfirmVerseCall__Inputs(this);
  }

  get outputs(): ConfirmVerseCall__Outputs {
    return new ConfirmVerseCall__Outputs(this);
  }
}

export class ConfirmVerseCall__Inputs {
  _call: ConfirmVerseCall;

  constructor(call: ConfirmVerseCall) {
    this._call = call;
  }

  get _verseId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _numericalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ConfirmVerseCall__Outputs {
  _call: ConfirmVerseCall;

  constructor(call: ConfirmVerseCall) {
    this._call = call;
  }
}

export class DonateCall extends ethereum.Call {
  get inputs(): DonateCall__Inputs {
    return new DonateCall__Inputs(this);
  }

  get outputs(): DonateCall__Outputs {
    return new DonateCall__Outputs(this);
  }
}

export class DonateCall__Inputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }
}

export class DonateCall__Outputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class TryExitEditModeCall extends ethereum.Call {
  get inputs(): TryExitEditModeCall__Inputs {
    return new TryExitEditModeCall__Inputs(this);
  }

  get outputs(): TryExitEditModeCall__Outputs {
    return new TryExitEditModeCall__Outputs(this);
  }
}

export class TryExitEditModeCall__Inputs {
  _call: TryExitEditModeCall;

  constructor(call: TryExitEditModeCall) {
    this._call = call;
  }
}

export class TryExitEditModeCall__Outputs {
  _call: TryExitEditModeCall;

  constructor(call: TryExitEditModeCall) {
    this._call = call;
  }
}

export class VoteToExitEditModeCall extends ethereum.Call {
  get inputs(): VoteToExitEditModeCall__Inputs {
    return new VoteToExitEditModeCall__Inputs(this);
  }

  get outputs(): VoteToExitEditModeCall__Outputs {
    return new VoteToExitEditModeCall__Outputs(this);
  }
}

export class VoteToExitEditModeCall__Inputs {
  _call: VoteToExitEditModeCall;

  constructor(call: VoteToExitEditModeCall) {
    this._call = call;
  }
}

export class VoteToExitEditModeCall__Outputs {
  _call: VoteToExitEditModeCall;

  constructor(call: VoteToExitEditModeCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
